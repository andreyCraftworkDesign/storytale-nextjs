import React from "react";
import Link from "next/link";
import IllustrationsList from "../illustrations-list/illustrations-list";
import WidgetPack from "../widget-pack/widget-pack";

function IllustrationPack(props) {
  const {
    id = null,
    name = null,
    cover = null,
    illustrationCount = null,
  } = props.packInfo;


  return (
    <section className={`illustrations-pack ${props.classes}`}>
      <div className="container-custom">
        <div className="row">
          <div class="col-auto mx-auto">
            {props.packInfo != null ? (
              <WidgetPack
                id={id}
                name={name}
                cover={cover}
                quantity={illustrationCount}
              />
            ) : null}
          </div>

          <div className="col-12">
            <IllustrationsList
              pictures={props.packIllustrations}
            />
          </div>
        </div>
        <div className="row">
          <div className="col mx-auto">
            <Link href={`/pack/${props.packInfo != null ? id : null}`} >
              <a
                className="base-link mx-auto"
              >
                Explore full pack
            </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IllustrationPack;
